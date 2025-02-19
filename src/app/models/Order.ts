export interface Order {
    id?: number;            
    userId: number;          
    orderType: 'delivery' | 'pickup'; 
    cartId: number;          
    totalAmount: number;     
    orderStatus: string;     
    createdAt: string;      
    customerAddress?:string;
    totalPrice?:string;
  }
  