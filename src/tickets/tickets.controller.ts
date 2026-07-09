import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  Get,
  Param,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import express from 'express';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  async create(
    @Res() res: express.Response,
    @Body() createTicketDto: CreateTicketDto,
  ) {
    const newTicket = await this.ticketsService.create(createTicketDto);

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: newTicket,
      message: 'تیکت ایجاد شد',
    });
  }

  @Get()
  async findAll(@Res() res: express.Response) {
    const tickets = await this.ticketsService.findAll();
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: tickets,
      message: 'تیکت ها با موفقیت دریافت شدند',
    });
  }

  @Get(':id')
  async findOne(@Res() res: express.Response, @Param('id') id: string) {
    const ticket = await this.ticketsService.findOne(+id);

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: ticket,
      message: 'تیکت با موفقیت دریافت شد',
    });
  }
}
