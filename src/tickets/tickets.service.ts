import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    private readonly userService: UsersService,
  ) {}

  async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
    const { userId, replyTo, ...ticketData } = createTicketDto;
    const user = await this.userService.findOne(userId);
    let replyToTicket;
    if (replyTo) {
      replyToTicket = await this.ticketRepository.findOne({
        where: { id: replyTo },
        relations: { replyTo: true },
      });

      if (replyToTicket.replyTo)
        throw new BadRequestException('شما نمیتوانید به یک تیکت پاسخ دهید');
    }

    const ticket = await this.ticketRepository.create({
      ...ticketData,
      user,
      replyTo: replyToTicket,
    });
    return this.ticketRepository.save(ticket);
  }

  async findAll(): Promise<Ticket[]> {
    return this.ticketRepository.find({
      relations: { user: true, replyTo: true },
    });
  }

  async findOne(id: number): Promise<Ticket> {
    const ticket = await this.ticketRepository.findOne({
      where: { id },
      relations: { user: true, replyTo: true },
    });
    if (!ticket) {
      throw new NotFoundException('تیکت یافت نشد');
    }
    return ticket;
  }
}
