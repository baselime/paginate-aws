export async function* paginate<T extends (next?:string) => Promise<any>, S extends string & keyof Awaited<ReturnType<T>>>(callback: T, paginationKey: S): AsyncGenerator<ReturnType<T>, void, void> {
	async function* makeRequest(Next?: string ) {
		const response = await callback(Next);
		yield response;
        
		if (response && typeof response === 'object' && paginationKey in response && typeof response[paginationKey] === 'string') {
			yield* makeRequest(response[paginationKey]);
		}
	}

	yield* makeRequest();
}
