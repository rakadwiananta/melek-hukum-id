declare module 'midtrans-client' {
  export class Snap {
    constructor(options: SnapOptions)
    createTransaction(parameter: CreateTransactionParameter): Promise<CreateTransactionResponse>
    createTransactionToken(parameter: CreateTransactionParameter): Promise<string>
  }

  export class CoreApi {
    constructor(options: CoreApiOptions)
    charge(parameter: ChargeParameter): Promise<ChargeResponse>
    capture(parameter: CaptureParameter): Promise<CaptureResponse>
    status(parameter: StatusParameter): Promise<StatusResponse>
    approve(parameter: ApproveParameter): Promise<ApproveResponse>
    deny(parameter: DenyParameter): Promise<DenyResponse>
    cancel(parameter: CancelParameter): Promise<CancelResponse>
    expire(parameter: ExpireParameter): Promise<ExpireResponse>
    refund(parameter: RefundParameter): Promise<RefundResponse>
  }

  export interface SnapOptions {
    isProduction: boolean
    serverKey: string
    clientKey: string
  }

  export interface CoreApiOptions {
    isProduction: boolean
    serverKey: string
    clientKey: string
  }

  export interface CreateTransactionParameter {
    transaction_details: {
      order_id: string
      gross_amount: number
    }
    item_details?: Array<{
      id: string
      price: number
      quantity: number
      name: string
    }>
    customer_details?: {
      first_name: string
      last_name?: string
      email?: string
      phone?: string
    }
    enabled_payments?: string[]
    payment_type?: string
    bank_transfer?: {
      bank: string
    }
  }

  export interface CreateTransactionResponse {
    token: string
    redirect_url: string
  }

  export interface ChargeParameter {
    payment_type: string
    transaction_details: {
      order_id: string
      gross_amount: number
    }
    item_details?: Array<{
      id: string
      price: number
      quantity: number
      name: string
    }>
    customer_details?: {
      first_name: string
      last_name?: string
      email?: string
      phone?: string
    }
    bank_transfer?: {
      bank: string
    }
  }

  export interface ChargeResponse {
    order_id: string
    status_code: string
    gross_amount: string
    payment_type: string
    signature_key: string
    transaction_id: string
    transaction_status: string
    transaction_time: string
    status_message: string
    bank: string
    va_numbers?: Array<{
      bank: string
      va_number: string
    }>
    qr_string?: string
    actions?: Array<{
      name: string
      method: string
      url: string
    }>
  }

  export interface CaptureParameter {
    transaction_id: string
    gross_amount: number
  }

  export interface CaptureResponse {
    order_id: string
    status_code: string
    gross_amount: string
    payment_type: string
    signature_key: string
    transaction_id: string
    transaction_status: string
    transaction_time: string
    status_message: string
  }

  export interface StatusParameter {
    order_id: string
  }

  export interface StatusResponse {
    order_id: string
    status_code: string
    gross_amount: string
    payment_type: string
    signature_key: string
    transaction_id: string
    transaction_status: string
    transaction_time: string
    status_message: string
    bank: string
    va_numbers?: Array<{
      bank: string
      va_number: string
    }>
    qr_string?: string
    actions?: Array<{
      name: string
      method: string
      url: string
    }>
  }

  export interface ApproveParameter {
    order_id: string
  }

  export interface ApproveResponse {
    order_id: string
    status_code: string
    gross_amount: string
    payment_type: string
    signature_key: string
    transaction_id: string
    transaction_status: string
    transaction_time: string
    status_message: string
  }

  export interface DenyParameter {
    order_id: string
  }

  export interface DenyResponse {
    order_id: string
    status_code: string
    gross_amount: string
    payment_type: string
    signature_key: string
    transaction_id: string
    transaction_status: string
    transaction_time: string
    status_message: string
  }

  export interface CancelParameter {
    order_id: string
  }

  export interface CancelResponse {
    order_id: string
    status_code: string
    gross_amount: string
    payment_type: string
    signature_key: string
    transaction_id: string
    transaction_status: string
    transaction_time: string
    status_message: string
  }

  export interface ExpireParameter {
    order_id: string
  }

  export interface ExpireResponse {
    order_id: string
    status_code: string
    gross_amount: string
    payment_type: string
    signature_key: string
    transaction_id: string
    transaction_status: string
    transaction_time: string
    status_message: string
  }

  export interface RefundParameter {
    refund_key: string
    amount: number
    reason: string
  }

  export interface RefundResponse {
    order_id: string
    status_code: string
    gross_amount: string
    payment_type: string
    signature_key: string
    transaction_id: string
    transaction_status: string
    transaction_time: string
    status_message: string
  }
}

// Update: Hello to Goodbye 