export class CreateSchoolDto {
  name: string;
  address: string;
}

export class CreateTeacherDto {
  name: string;
  email: string;
  password: string;
  schoolId: string;
}

export class CreateStudentDto {
  name: string;
  email: string;
  password: string;
  schoolId: string;
}

export class UpdateDocumentVisibilityDto {
  visibility: boolean;
}