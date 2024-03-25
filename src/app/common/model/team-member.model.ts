export interface TeamMember {
    name: string;
    imageUrl: string;
    role: string;
    socialMediaPlatforms?: { 
      icon: PlatformIcon;
      url: string;
    }[];
  }
  export enum PlatformIcon {
    LINKEDIN = 'logo-linkedin',
    GITHUB = 'logo-github',
    PERSONAL_WEBSITE = 'globe',
    GREPPER = ''
  }