// Define the MessariDataDto interface
export class MessariDataDto {
  data: {  
    symbol: string;
    name: string;
    slug: string;
    profile: {
      general: {
        overview: {
          category: string;
          sector: string;
          project_details: string;
        };
      };
      economics: {
        token: {
          token_type: string;
          token_usage: string;
          token_usage_details: string;
        };
        consensus_and_emission: {
          consensus: {
            general_consensus_mechanism: string;
          };
        };
      };
      technology: {
        overview: {
          technology_details: string;
        };
      };
    };  
  };
};
