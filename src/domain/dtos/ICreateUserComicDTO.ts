export default interface ICreateUserComicDTO {
	comicId: string;
	title: string;
	description?: string;
	thumbnailUrl?: string;
	detailUrl?: string;
	userId: string;
}
