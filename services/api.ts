import { CastingSubmission, SponsorSubmission, Movie } from '../types';
import { MOCK_MOVIES } from '../constants';

// In a real implementation, these would be Axios calls to the Express backend.
// We are simulating the responses for the UI demonstration.

// Mock Data Store (in-memory for session)
let _movies = [...MOCK_MOVIES];
let _castingSubmissions: CastingSubmission[] = [
  {
    id: 'c1',
    name: 'Sarah Connor',
    email: 'sarah@example.com',
    socialHandle: '@sarahc',
    socialPlatform: 'Instagram',
    bio: 'Experienced in action and sci-fi roles.',
    hasConsented: true,
    signature: 'Sarah Connor',
    files: [
      { name: 'headshot.jpg', path: 'gs://bucket/headshot.jpg', type: 'image/jpeg' },
      { name: 'voice_reel.mp3', path: 'gs://bucket/voice.mp3', type: 'audio/mpeg' }
    ],
    status: 'new',
    submittedAt: new Date().toISOString()
  },
  {
    id: 'c2',
    name: 'K. Officer',
    email: 'k@lapd.com',
    socialHandle: '@replicant_hunter',
    socialPlatform: 'Twitter/X',
    bio: 'Specialist in noir atmosphere.',
    hasConsented: true,
    signature: 'K',
    files: [{ name: 'audition.mp3', path: 'gs://bucket/audition.mp3', type: 'audio/mpeg' }],
    status: 'new',
    submittedAt: new Date(Date.now() - 86400000).toISOString()
  }
];

let _sponsorSubmissions: SponsorSubmission[] = [
  {
    id: 's1',
    orgName: 'Tyrell Corp',
    email: 'partnerships@tyrell.com',
    subject: 'Nexus 9 Promotion',
    message: 'We want to sponsor the new AI series.',
    status: 'new',
    submittedAt: new Date().toISOString()
  }
];

export const api = {
  auth: {
    login: async (password: string) => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      // Updated credentials - Password only check
      if (password === 'Impact@123') {
        return {
          token: 'simulated-jwt-token-xyz-789',
          user: { id: 'admin-1', email: 'admin@impact.ai' } // Return dummy email for type compatibility
        };
      }
      throw new Error('Invalid credentials');
    }
  },

  submissions: {
    submitCasting: async (data: any) => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log("Casting submission to API:", data);
      const newSub: CastingSubmission = {
        ...data,
        id: 'cast-' + Date.now(),
        files: [], // In real app, these would be linked from the upload step
        status: 'new',
        submittedAt: new Date().toISOString()
      };
      _castingSubmissions.unshift(newSub);
      return { success: true, id: newSub.id };
    },
    submitSponsor: async (data: any) => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log("Sponsor submission to API:", data);
      const newSub: SponsorSubmission = {
        ...data,
        id: 'sponsor-' + Date.now(),
        status: 'new',
        submittedAt: new Date().toISOString()
      };
      _sponsorSubmissions.unshift(newSub);
      return { success: true, id: newSub.id };
    }
  },

  uploads: {
    // Simulate the 2-step direct upload flow
    uploadFile: async (file: File, type: 'casting' | 'sponsor' | 'movie') => {
      console.log(`Requesting signed URL for ${file.name} (${type})`);
      // Step 1: Get Signed URL (simulated)
      await new Promise(resolve => setTimeout(resolve, 500)); 
      
      console.log(`Uploading ${file.name} to GCS bucket...`);
      // Step 2: Upload to GCS (simulated)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      return { 
        success: true, 
        path: `gs://ai-impact-${type}-media/${Date.now()}_${file.name}`,
        url: URL.createObjectURL(file) // For demo preview purposes
      };
    }
  },

  admin: {
    getAnalytics: async () => {
      await new Promise(resolve => setTimeout(resolve, 600));
      return {
        activeSessions: 1204,
        totalContentSize: '42 TB',
        pendingSponsors: _sponsorSubmissions.filter(s => s.status === 'new').length,
        pendingCasting: _castingSubmissions.filter(c => c.status === 'new').length,
        serverLoad: '12%',
        totalViews: 45230,
        recentActivity: [
          { type: 'View', desc: 'Neon Horizon watched', time: '2m ago' },
          { type: 'Upload', desc: 'New casting reel', time: '15m ago' },
          { type: 'System', desc: 'Backup completed', time: '1h ago' }
        ]
      };
    },

    getMovies: async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return [..._movies];
    },

    saveMovie: async (movie: Movie) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const index = _movies.findIndex(m => m.id === movie.id);
      if (index >= 0) {
        _movies[index] = movie;
      } else {
        _movies.push({ ...movie, id: 'mov-' + Date.now() });
      }
      return { success: true };
    },

    deleteMovie: async (id: string) => {
      await new Promise(resolve => setTimeout(resolve, 800));
      _movies = _movies.filter(m => m.id !== id);
      return { success: true };
    },

    getCastingSubmissions: async () => {
      await new Promise(resolve => setTimeout(resolve, 600));
      return [..._castingSubmissions];
    },

    getSponsorSubmissions: async () => {
      await new Promise(resolve => setTimeout(resolve, 600));
      return [..._sponsorSubmissions];
    },

    updateSubmissionStatus: async (id: string, type: 'casting' | 'sponsor', status: string) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let email = '';
      if (type === 'casting') {
        const sub = _castingSubmissions.find(s => s.id === id);
        if (sub) {
          sub.status = status as any;
          email = sub.email;
        }
      } else {
        const sub = _sponsorSubmissions.find(s => s.id === id);
        if (sub) {
          sub.status = status as any;
          email = sub.email;
        }
      }

      // Simulate sending email
      console.log(`[Email Service] Sending ${status} notification to ${email}... SENT.`);
      
      return { success: true };
    }
  }
};