
// import {
//   Controller,
//   Post,
//   Get,
//   Param,
//   UseGuards,
//   Request,
//   UseInterceptors,
//   UploadedFile,
//   Body,
// } from '@nestjs/common';
// import { FilesService } from './files.service';
// import { UploadFileDto } from './dto/upload-file.dto';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';
// import { RolesGuard } from '../common/guards/roles.guard';
// import { Roles } from '../common/Decorators/roles.decorator';
// import { RoleType } from '../common/role.entity';
// import { ProjectsService } from '../projects/projects.service';
// import { FileInterceptor } from '@nestjs/platform-express';
// import * as path from 'path';
// import { Multer } from 'multer';  // Import Multer directly from the 'multer' package

// import { diskStorage } from 'multer';
// import { Express } from 'express';  // Import the Express types

// @Controller('projects/:projectId/files')
// @UseGuards(JwtAuthGuard, RolesGuard)
// export class FilesController {
//   constructor(
//     private files: FilesService,
//     private projects: ProjectsService,
//   ) {}

//   @Post()
//   @Roles(RoleType.CLIENT, RoleType.FREELANCER)
//   @UseInterceptors(
//     FileInterceptor('file', {
//       storage: diskStorage({
//         destination: './uploads', // Define the upload folder
//         filename: (req, file, cb) => {
//           const filename = `${Date.now()}-${file.originalname}`;
//           cb(null, filename);
//         },
//       }),
//     }),
//   )
//   async upload(
//     @Param('projectId') pid: string,
//     @UploadedFile() file: Express.Multer.File, // Use the correct Multer file type
//     @Body() dto: UploadFileDto,
//     @Request() req,
//   ) {
//     const project = await this.projects.findOne(+pid);

//     // Save the file information in the database
//     const uploadedFile = await this.files.upload(project, {
//       filename: file.filename,
//       url: path.join('/uploads', file.filename), // Assuming you store files in '/uploads'
//     }, req.user);

//     return uploadedFile;
//   }

//   @Get()
//   @Roles(RoleType.CLIENT, RoleType.FREELANCER)
//   findByProject(@Param('projectId') pid: string) {
//     return this.files.findByProject(+pid);
//   }
// }
// 
import {
  Controller,
  Post,
  Param,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/Decorators/roles.decorator';
import { RoleType } from '../common/role.entity';
import { ProjectsService } from '../projects/projects.service';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import { diskStorage } from 'multer';

@Controller('projects/:projectId/files')
@UseGuards(JwtAuthGuard, RolesGuard)
export class FilesController {
  constructor(
    private files: FilesService,
    private projects: ProjectsService,
  ) {}

  @Post()
  @Roles(RoleType.CLIENT, RoleType.FREELANCER)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads', // Define the upload folder
        filename: (req, file, cb) => {
          const filename = `${Date.now()}-${file.originalname}`;
          cb(null, filename);
        },
      }),
    }),
  )
  async upload(
    @Param('projectId') pid: string,
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
  ) {
    const project = await this.projects.findOne(+pid);

    // Prepare the file data including mimetype and URL
    const fileData = {
      filename: file.filename,
      url: path.join('/uploads', file.filename),
      mimetype: file.mimetype,  // Ensure mimetype is included
    };

    // Save the file information in the database
    const uploadedFile = await this.files.upload(project, fileData, req.user);

    return uploadedFile;
  }
}
