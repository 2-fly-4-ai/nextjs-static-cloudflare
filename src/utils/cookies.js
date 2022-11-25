import cookie from 'cookie';

export function parseCookies( req ) {
	console.warn(req.headers.cookie)
	return cookie.parse(req.headers.cookie ?? "");

}

export function getAuthToken( req ) {
	console.warn(req)
	const cookies = parseCookies( req );
	return cookies.auth || '' ;
}
