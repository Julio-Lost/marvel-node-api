import { DataResult, IResponseData } from '@domain/dtos/IResponseApiMarvelDTO';

export class ResponseApiMarvelViewModel {
	offset: number;
	limit: number;
	total: number;
	count: number;
	results: DataResult[];

	constructor(data: IResponseData) {
		this.offset = data.offset;
		this.limit = data.limit;
		this.total = data.total;
		this.count = data.count;

		const dataResultList: DataResult[] = [];

		data.results.map((item) => {
			const dataResult = new DataResult(item);
			dataResultList.push(dataResult);
		});

		this.results = dataResultList;
	}
}
