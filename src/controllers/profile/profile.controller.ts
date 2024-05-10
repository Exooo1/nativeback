import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { JwtAuthGuard } from '../../guard/auth/auth.guard';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  // @UseGuards(JwtAuthGuard)
  @Get()
  profile(@Req() req: any) {
    return this.profileService.profile(req.user);
  }
}
