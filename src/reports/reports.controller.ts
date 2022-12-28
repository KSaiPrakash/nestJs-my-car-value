import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { GetEstimateDTO } from 'src/users/dto/get-estimate.dto';
import { User } from 'src/users/user.entity';
import { AuthGuard } from '../guards/auth.guard';
import { ApproveReportDTO } from './dto/approve-report.dto';
import { CreateReportDTO } from './dto/create-report.dto';
import { ReportDTO } from './dto/report.dto';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {

    constructor(private reportsService: ReportsService) {}

    @Post()
    @UseGuards(AuthGuard)
    @Serialize(ReportDTO)
    createReport(@Body() body: CreateReportDTO, @CurrentUser() user: User) {
        return this.reportsService.create(body, user);
    }

    @Patch('/:id')
    @UseGuards(AdminGuard)
    approveReport(@Param('id') id: string, @Body() body: ApproveReportDTO) {
        return this.reportsService.changeApproval(id, body.approved);
    }

    @Get()
    getEstimate(@Query() query: GetEstimateDTO) {
        return this.reportsService.createEstimate(query);
    }
}
