import axios from 'axios';

class PaymentService {
  // private proxy =
  //   process.env.NODE_ENV === 'production' ? process.env.serverUrl : '';
  private proxy = ``;

  private baseUrl = this.proxy + '/payments';
  private headers = { headers: { 'Content-Type': 'application/json' } };

  public async addDeposits(deposit: {
    amount: number;
    currency: any;
  }): Promise<boolean> {
    try {
      const { data } = await axios.post<Promise<any>>(
        `${this.baseUrl}/deposits/`,
        {
          ...deposit,
          deposit_amount: deposit.amount,
        },
        this.headers
      );
      return !!data;
    } catch (error) {
      throw new Error(
        JSON.stringify({
          ...error.response.data,
          status: error.response.status,
        })
      );
    }
  }
}

export default new PaymentService();
