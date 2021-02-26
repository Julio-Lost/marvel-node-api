interface IUrl {
	type: string;
	url: string;
}

interface IThumbnail {
	path: string;
	extension: string;
}

interface IDataResult {
	id: number;
	title: string;
	name: string;
	description: string | null;
	urls: IUrl[];
	thumbnail: IThumbnail;
}

export class DataResult {
	id: number;
	name: string;
	description: string | null;
	detailUrl: string;
	thumbnailUrl: string;
	isFavorited: boolean;

	constructor(data: IDataResult) {
		this.id = data.id;
		this.name = data.title ? data.title : data.name;
		this.description = data.description;
		this.thumbnailUrl = `${data.thumbnail.path}.${data.thumbnail.extension}`;
		this.isFavorited = false;

		data.urls.forEach((item) => {
			if (item.type === 'detail') {
				this.detailUrl = item.url;
			}
		});
	}
}

export interface IResponseData {
	offset: number;
	limit: number;
	total: number;
	count: number;
	results: IDataResult[];
}

export default interface IResponseApiMarvelDTO {
	code: number;
	status: string;
	copyright: string;
	attributionText: string;
	attributionHTML: string;
	etag: string;
	data: IResponseData;
}
