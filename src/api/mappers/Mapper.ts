export abstract class Mapper<Entity, ReqDto, ResDto> {

    public async mapAllToEntity(dtos: ReqDto[]): Promise<Entity[]> {
        return Promise.all(dtos.map(async (dto) => this.mapToEntity(dto)));
    }

    public async mapAllToResponseDto(entities: Entity[]): Promise<ResDto[]> {
        return Promise.all(entities.map(async (entitiy) => this.mapToResponseDto(entitiy)));
    }

    public abstract async mapToResponseDto(entity: Entity): Promise<ResDto>;

    public abstract async mapToEntity(dto: ReqDto): Promise<Entity>;
}
