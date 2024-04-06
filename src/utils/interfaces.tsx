export interface Medias {
  mediasList: [
    {
      backdrop_path: string;
      id: number;
      title?: string;
      name?: string;
      original_language: string;
      overview: string;
      poster_path: string;
      media_type: string;
      genre_ids: number[];
      popularity: number;
      vote_average: number;
      vote_count: number;
    }
  ];
  images: {
    base_url: string;
    secure_base_url: string;
    backdrop_sizes: string[];
    logo_sizes: string[];
    poster_sizes: string[];
    profile_sizes: string[];
    still_sizes: string[];
  };
}
