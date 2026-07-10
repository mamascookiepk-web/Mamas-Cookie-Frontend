// Mirrors the backend's strictly-enforced order status state machine.
export function getAvailableActions(status, orderType) {
  switch (status) {
    case 'PENDING':
      return [
        { status: 'ACCEPTED', label: 'Accept' },
        { status: 'REJECTED', label: 'Reject', danger: true, needsReason: true },
        { status: 'CANCELLED', label: 'Cancel', danger: true },
      ];
    case 'ACCEPTED':
      return [
        { status: 'PREPARING', label: 'Start Preparing' },
        { status: 'REJECTED', label: 'Reject', danger: true, needsReason: true },
        { status: 'CANCELLED', label: 'Cancel', danger: true },
      ];
    case 'PREPARING':
      return [
        orderType === 'DELIVERY'
          ? { status: 'OUT_FOR_DELIVERY', label: 'Out for Delivery' }
          : { status: 'READY_FOR_PICKUP', label: 'Ready for Pickup' },
        { status: 'CANCELLED', label: 'Cancel', danger: true },
      ];
    case 'OUT_FOR_DELIVERY':
    case 'READY_FOR_PICKUP':
      return [{ status: 'COMPLETED', label: 'Mark Completed' }];
    default:
      return [];
  }
}
