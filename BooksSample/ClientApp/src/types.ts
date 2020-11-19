export interface Author {
	id: string,
	firstName: string,
	lastName: string,
	fullName: string,
}

export interface Book {
	id: string,
	title: string,
	pagesCount: number,
	year: string,
	authorId: string,
}

export interface ErrorResponse {
	type: string,
	title: string,
	status: number,
	traceId: string,
	errors: Record<string, Array<string>>
}