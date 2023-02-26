export class GetAllDataAvailable {
    constructor(dataRepository) {
      this.dataRepository = dataRepository;
    }
  
    async execute() {
      return await this.dataRepository.getData();
    }
  }