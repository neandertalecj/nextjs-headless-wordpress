import DOMPurify from 'dompurify';

/**
 * Sanitize markup or text when used inside dangerouslysetInnerHTML
 *
 * @param {string} content Plain or html string.
 *
 * @return {string} Sanitized string
 */
export const sanitize = (content) => {
    return process.browser ? DOMPurify.sanitize(content) : content
}//process.browser  - чи в браузері
// For anyone else like me that comes across this thread wondering what they should use, according to this PR #7651 process.browser is now deprecated and the recommended approach is
// typeof window === "undefined"