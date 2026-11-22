// Quantumult X: filter YouTube app navigation entries from the binary guide response.
// Field names and numbers: Maasea/sgmodule, Script/Youtube/youtube.response.js (65075cdb).
// The original guide already hides the first three entries. FEshorts is the new preference.
(() => {
  const hiddenIds = new Set(["SPunlimited", "FEuploads", "FEmusic_immersive", "FEshorts"]);

  function readVarint(bytes, cursor, integer) {
    let value = 0;
    const limit = integer ? 5 : 10;
    for (let i = 0; i < limit && cursor.pos < bytes.length; i++) {
      const byte = bytes[cursor.pos++];
      if (integer) value += (byte & 127) * 128 ** i;
      if (byte < 128 && (!integer || value <= 0xffffffff)) return value;
    }
    throw Error("Invalid protobuf varint");
  }

  // Read only field boundaries. An unrecognized wire format leaves the whole guide untouched.
  function* fields(bytes) {
    const cursor = { pos: 0 };
    while (cursor.pos < bytes.length) {
      const start = cursor.pos;
      const tag = readVarint(bytes, cursor, true);
      const keyEnd = cursor.pos;
      const wire = tag % 8;
      const id = Math.floor(tag / 8);
      if (!id) throw Error("Invalid field number");
      let data;
      if (wire === 2) {
        const size = readVarint(bytes, cursor, true);
        const begin = cursor.pos;
        cursor.pos += size;
        data = bytes.subarray(begin, cursor.pos);
      } else if (wire === 0) readVarint(bytes, cursor, false);
      else if (wire === 1 || wire === 5) cursor.pos += wire === 1 ? 8 : 4;
      else throw Error("Unsupported protobuf wire type");
      if (cursor.pos > bytes.length) throw Error("Truncated guide");
      yield { id, data, key: bytes.subarray(start, keyEnd), raw: bytes.subarray(start, cursor.pos) };
    }
  }

  function sizePrefix(n) {
    const prefix = [];
    while (n >= 128) {
      prefix.push((n % 128) + 128);
      n = Math.floor(n / 128);
    }
    return Uint8Array.from([...prefix, n]);
  }

  // Undefined keeps a field byte for byte, null drops it, a byte array replaces its payload.
  function edit(message, visit) {
    let changed = false;
    const parts = [];
    for (const field of fields(message)) {
      const replacement = field.data === undefined ? undefined : visit(field.id, field.data);
      if (replacement === undefined) parts.push(field.raw);
      else {
        changed = true;
        if (replacement !== null) parts.push(field.key, sizePrefix(replacement.length), replacement);
      }
    }
    if (!changed) return undefined;
    const out = new Uint8Array(parts.reduce((n, part) => n + part.length, 0));
    let offset = 0;
    for (const part of parts) { out.set(part, offset); offset += part.length; }
    return out;
  }

  function isHiddenEntry(item) {
    for (const renderer of fields(item)) {
      if (!renderer.data || (renderer.id !== 318370163 && renderer.id !== 117501096)) continue;
      for (const entry of fields(renderer.data)) {
        if (entry.id === 1 && entry.data && entry.data.length <= 32 &&
            hiddenIds.has(String.fromCharCode(...entry.data))) return true;
      }
    }
    return false;
  }

  function filterSection(id, section) {
    if (id !== 117866661) return undefined;
    return edit(section, (id, item) => id === 1 && isHiddenEntry(item) ? null : undefined);
  }

  let result = {};
  try {
    if ($response.bodyBytes) {
      const changed = edit(new Uint8Array($response.bodyBytes), (id, item) =>
        id === 4 || id === 6 ? edit(item, filterSection) : undefined);
      if (changed) result = { bodyBytes: changed.buffer };
    }
  } catch (_) { /* Pass through an unrecognized or incomplete response. */ }
  $done(result);
})();
