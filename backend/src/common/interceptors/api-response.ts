export default class ApiResponse {
  constructor(
    private readonly data: any,
    private readonly message: string | undefined = '',
  ) {
    this.data = data;
    this.message = this.getMessageWithCapitalizedFirstLetter(message);
  }

  getMessageWithCapitalizedFirstLetter(message: string): string {
    return message.charAt(0).toUpperCase() + message.slice(1);
  }
}
