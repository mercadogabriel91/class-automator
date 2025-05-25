import { ApiProperty } from "@nestjs/swagger";

export class DeleteContentLevelResponseDto {
  @ApiProperty({
    description: 'Indicates if the deletion was successful',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: 'Success or error message',
    example: 'Content level deleted successfully',
  })
  message: string;

  @ApiProperty({
    description: 'ID of the deleted resource',
    example: 'uuid-string-here',
  })
  deletedId: string;

  @ApiProperty({
    description: 'Number of affected rows',
    example: 1,
  })
  affected: number;

  constructor(
    success: boolean,
    message: string,
    deletedId: string,
    affected: number,
  ) {
    this.success = success;
    this.message = message;
    this.deletedId = deletedId;
    this.affected = affected;
  }
}
