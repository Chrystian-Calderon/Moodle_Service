import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ChangePasswordDto } from './dto/change.dto';
import { AuthenticatedUser } from 'src/common/types/authenticated-user';


interface AuthenticatedRequest {
    user: AuthenticatedUser;
}

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Post('logout')
    @UseGuards(JwtAuthGuard)
    logout() {
        return this.authService.logout();
    }

    @Post('change-password')
    @UseGuards(JwtAuthGuard)
    changePassword(@Request() req: AuthenticatedRequest, @Body() dto: ChangePasswordDto,) {
        return this.authService.changePassword(req.user.id, dto.password);
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    obtenerPerfil(@Request() req: AuthenticatedRequest,) {
        return this.authService.getProfile(req.user.id,);
    }
}
