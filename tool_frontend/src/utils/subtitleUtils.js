//
// Subtitle utilities: Convert SRT subtitles to WebVTT format for HTML5 <track> usage.
//

// PUBLIC_INTERFACE
export function convertSrtTextToVtt(srtText) {
  /**
   * Convert SRT subtitle text to WebVTT text.
   * - Normalizes line endings
   * - Adds "WEBVTT" header
   * - Converts comma millisecond separators to dot (00:00:01,600 -> 00:00:01.600)
   * - Keeps cue numbers as optional cue IDs (valid in WebVTT)
   * @param {string} srtText - Raw SRT file text
   * @returns {string} WebVTT formatted text
   */
  if (typeof srtText !== 'string') {
    throw new Error('convertSrtTextToVtt: expected string input');
  }

  // Remove BOM, normalize newlines, trim trailing/leading whitespace
  let normalized = srtText.replace(/^\uFEFF/, '').replace(/\r+/g, '');
  // Convert SRT timestamps to VTT format (comma -> dot for milliseconds)
  normalized = normalized.replace(/(\d{2}:\d{2}:\d{2}),(\d{3})/g, '$1.$2');

  // Ensure blank line at end
  const body = normalized.trim() + '\n';
  return `WEBVTT\n\n${body}`;
}

// PUBLIC_INTERFACE
export async function convertSrtBlobToVttBlob(fileOrBlob) {
  /**
   * Convert an SRT File or Blob to a WebVTT Blob.
   * @param {Blob|File} fileOrBlob - The SRT file/blob content
   * @returns {Promise<Blob>} A Blob with MIME type "text/vtt"
   */
  if (!fileOrBlob || typeof fileOrBlob.text !== 'function') {
    throw new Error('convertSrtBlobToVttBlob: expected a File/Blob with .text()');
  }
  const srtText = await fileOrBlob.text();
  const vttText = convertSrtTextToVtt(srtText);
  return new Blob([vttText], { type: 'text/vtt' });
}
