export var OrderStatusEnum;
(function (OrderStatusEnum) {
    OrderStatusEnum["PENDING"] = "PENDING";
    OrderStatusEnum["PROCESSING"] = "PROCESSING";
    OrderStatusEnum["ENROUTE"] = "ENROUTE";
    OrderStatusEnum["READY"] = "READY";
    OrderStatusEnum["CONFIRMED"] = "CONFIRMED";
    OrderStatusEnum["DELIVERED"] = "DELIVERED";
})(OrderStatusEnum || (OrderStatusEnum = {}));
export var PaymentStatusEnum;
(function (PaymentStatusEnum) {
    PaymentStatusEnum["PENDING"] = "PENDING";
    PaymentStatusEnum["PAID"] = "PAID";
    PaymentStatusEnum["FAILED"] = "FAILED";
})(PaymentStatusEnum || (PaymentStatusEnum = {}));
