import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUsuarioDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Permission } from 'src/common/decorator/decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('search')
  @UseGuards(JwtAuthGuard)
  @Permission('usuarios.ver')
  buscarUsuarios(
    @Query('q') q: string,
  ) {
    return this.userService.buscarUsuarios(q);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  obtenerUsuarioPorId(@Param('id') id: string) {
    return this.userService.buscarDetallePorId(id);
  }

  @Patch(':id')
  async actualizarUsuario(@Param('id') id: string, @Body() data: UpdateUsuarioDto,) {
    return await this.userService.actualizarUsuario(id, data,);
  }

  @Delete(':id')
  desactivarUsuario(@Param('id') id: string) {
    return this.userService.DesactivarUsuario(id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @Permission('usuarios.ver')
  obtenerUsuarios(
    @Query('page') page = '1',
    @Query('limit') limit = '10',
  ) {
    return this.userService.ObtenerTodosPaginado(Number(page), Number(limit),);
  }




}
