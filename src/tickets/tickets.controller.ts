import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
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
}
