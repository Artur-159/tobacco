/**
 * Returns an object with `limit` and `offset` properties.
 *
 * @param {string} limit - The number of items to return. Default is "20".
 * @param {string} offset - The number of items to skip. Default is "0".
 * @return {object} An object with `limit` and `offset` properties.
 */
const Params = (limit = "20", offset = "0") => ({ limit, offset });

export default Params;
