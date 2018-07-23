export const getOpenPostHeaders = (): Headers => {
	const headers: Headers = new Headers();
	headers.append('Content-Type', 'application/json');
	return headers;
};

export const getAuthPostHeaders = (token: string): Headers => {
	const headers: Headers = new Headers();
	headers.append('Content-Type', 'application/json');
	headers.append('Authorization', 'Bearer ' + token);
	return headers;
};

export const resolveFetch = (response: Response): Promise<any> => {
	if (!response.ok) {
		if (response.status === 400) {
			return Promise.reject(new Error('Bad Request'));
		}
		if (response.status === 401) {
			return Promise.reject(new Error('Unauthorized'));
		}
		return response.json().then((err) => new Error(err.message));
	}
	return response.json();
};
export const resolveBlobFetch = (response: Response): Promise<any> => {
	if (!response.ok) {
		if (response.status === 400) {
			return Promise.reject(new Error('Bad Request'));
		}
		if (response.status === 401) {
			return Promise.reject(new Error('Unauthorized'));
		}
		return response.json().then((err) => new Error(err.message));
	}
	return response.blob();
};
