import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scroll to top of page
 *
 * React does not include scroll restoration functionality out of the box.
 * The use location hook is supplied tby react-router-dom and  returns an
 * object with the following properties
 *     hash, key, pathname, search, state
 * Use the useEffect hook the fires whenever the location pathname changes to
 * scrollto the top of the page
 *
 * @returns {null}
 */
export default function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}