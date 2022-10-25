import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface Roleset {
  activeRole: number;
  quickTodosExpand: boolean;
  roles: any;
}
@Injectable({
  providedIn: 'root',
})
export class RolesetService {
  constructor(private http: HttpClient) {}

  interdataList: Roleset[] = [
    {
      activeRole: 0,
      quickTodosExpand: true,
      roles: [
        {
          id: 0,
          role: 'Planning Team',
          name: 'John',
        },
        {
          id: 1,
          role: 'Planning Manager',
          name: 'Peter',
        },
        {
          id: 2,
          role: 'Store Operations Team',
          name: 'Bucky',
        },
        {
          id: 3,
          role: 'Shipping Team',
          name: 'Danny',
        },
        {
          id: 4,
          role: 'Delivery',
          name: 'Sam',
        },
        {
          id: 5,
          role: 'R&A Team',
          name: 'Ben',
        },
        {
          id: 6,
          role: 'Beauty Merchant Manager',
          name: 'David',
        },
        {
          id: 7,
          role: 'BAU Support',
          name: 'Support',
        },
      ],
    },
  ];

  icons: any = [
    {
      file: 'assets/icons/V2/invite.png',
      text: 'Planner Request',
      desc: 'Planner initiates the RL request to Store or Warehouse team',
      link: '/idctransfer',
      hot: true,
      role: [0, 1],
    },
    {
      file: 'assets/icons/V2/list.png',
      text: 'Fulfillment',
      desc: 'Warehouse/Stores team to validate and approve orders created',
      link: '/idctransferin',
      hot: true,
      role: [2, 7],
    },
    {
      file: 'assets/icons/V2/cargo-ship.png',
      text: 'Shipment Consolidation',
      desc: 'Warehouse/Stores Team to consolidate all shipment IDs before Goods receipt.',
      link: '/shipmentconsolidation',
      hot: true,
      role: [3],
    },
    {
      file: 'assets/icons/V2/create-order.png',
      text: 'Order Creation',
      desc: 'Create sales order on behalf for your store',
      link: '/order-creation',
      hot: false,
      role: [5],
    },
    {
      file: 'assets/icons/V2/view-details.png',
      text: 'Shipment Visibility',
      desc: 'Shipment Visibility',
      link: '/intransit',
      hot: true,
      role: [0, 1, 2, 3, 4, 5, 6, 7],
    },
    {
      file: 'assets/icons/V2/delivery.png',
      text: 'Delivery',
      desc: 'Track Delivery Status based on DO',
      link: '/delivery',
      hot: true,
      role: [2, 7],
    },
    {
      file: 'assets/icons/V2/move-stock.png',
      text: 'Stock Transfers',
      desc: 'Perform Location to Location Transfers',
      link: '/stocktransfer',
      hot: false,
      role: [2, 4, 7],
    },
    {
      file: 'assets/icons/V2/box-settings-1.png',
      text: 'Vendor On-Boarding',
      desc: 'Kick-start the onboarding of your new vendors',
      link: '/newvendor',
      hot: false,
      role: [0, 1, 6],
    },
    {
      file: 'assets/icons/V2/view-delivery.png',
      text: 'Product 360 View',
      desc: 'Gain a comprehensive view of your desired product',
      link: '/stocktransfer',
      hot: false,
      role: [],
    },
    {
      file: 'assets/icons/V2/price-tag-euro.png',
      text: 'Pricing 360 View',
      desc: 'Gain a comprehensive pricing overview of your desired product',
      link: '/stocktransfer',
      hot: false,
      role: [],
    },
    {
      file: 'assets/icons/V2/360-view.png',
      text: 'Product Assortment 360 View',
      desc: 'Gain a comprehensive view of your product assortment list',
      link: '/category/',
      hot: false,
      role: [0, 1, 2, 6, 7],
    },
    {
      file: 'assets/icons/V2/metric.png',
      text: 'Product Assortment Metrics',
      desc: 'Gain a comprehensive view of your product assortment metrics',
      link: '/assortment-metrics/',
      hot: false,
      role: [0, 1, 2, 6],
    },
    {
      file: 'assets/icons/V2/view-details.png',
      text: 'Retail Order Visibility',
      desc: 'Track your selected retail order progress',
      link: '/stocktransfer',
      hot: false,
      role: [],
    },
    {
      file: 'assets/icons/V2/purchase-order.png',
      text: 'Vendor Purchase Order Creation',
      desc: 'Create PO for your selected vendor',
      link: '/stocktransfer',
      hot: false,
      role: [0, 1],
    },
    {
      file: 'assets/icons/V2/investment.png',
      text: 'Asset Management',
      desc: 'Manage your assets',
      link: '/stocktransfer',
      hot: false,
      role: [],
    },
    {
      file: 'assets/icons/V2/associate_360.png',
      text: 'Associate 360',
      desc: 'Associate 360',
      link: '/stocktransfer',
      hot: false,
      role: [2, 6],
    },
    {
      file: 'assets/icons/V2/submit-timeSheet.png',
      text: 'Submit Timesheet',
      desc: 'Submit your timesheets',
      link: '/stocktransfer',
      hot: false,
      role: [0, 1, 2, 3, 4, 5, 6],
      size: '41px'
    },
    {
      file: 'assets/icons/V2/apply_leave.png',
      text: 'Apply Leave',
      desc: 'Apply leave',
      link: '/stocktransfer',
      hot: false,
      role: [0, 1, 2, 3, 4, 5, 6],
      size: '37px'
    },
    {
      file: 'assets/icons/V2/create_expense.png',
      text: 'Create Expense',
      desc: 'Create Expense',
      link: '/stocktransfer',
      hot: false,
      role: [0, 1, 2, 3, 4, 5, 6],
      size: '36px'
    },
    {
      file: 'assets/icons/V2/approve_expense.png',
      text: 'Approve Expense',
      desc: 'Approve Expense',
      link: '/stocktransfer',
      hot: false,
      role: [0, 1, 2, 3, 4, 5, 6],
      size: '37px'
    },
    {
      file: 'assets/icons/V2/my-learning-studio.png',
      text: 'My Learning Studio',
      desc: 'My Learning Studio',
      link: '/stocktransfer',
      hot: false,
      role: [0, 1, 2, 3, 4, 5, 6],
      size: '35px'
    },
    {
      file: 'assets/icons/V2/t_m_invoice.png',
      text: 'T&M Invoice',
      desc: 'T&M Invoice',
      link: '/stocktransfer',
      hot: false,
      role: [0, 1, 2, 3, 4, 5, 6],
      size: '36px'
    },
    {
      file: 'assets/icons/V2/download_payslip.png',
      text: 'Download Payslip',
      desc: 'Download Payslip',
      link: '/stocktransfer',
      hot: false,
      role: [0, 1, 2, 3, 4, 5, 6],
      size: '36px'
    },
    {
      file: 'assets/icons/V2/metric.png',
      text: 'Product Lookup',
      desc: 'Product Details',
      link: '/product-lookup/',
      hot: false,
      role: [0, 1, 6, 7],
      size: '48px'
    },
    {
      file: 'assets/icons/V2/view-details.png',
      text: 'Inventory Variance Analyser',
      desc: 'Inventory Variance Analyser',
      link: '/inventory-variance/',
      hot: false,
      role: [0, 1, 6, 7],
      size: '48px'
    },
    {
      file: 'assets/icons/V2/price-lookup.png',
      text: 'Price Lookup',
      desc: 'Price Lookup',
      link: '/price-lookup/',
      hot: false,
      role: [0, 1, 6, 7],
      size: '52px'
    }
  ];

  getIcons() {
    return this.icons;
  }

  change(id: number) {
    console.log(id);
    this.interdataList[0].activeRole = id;
  }

  expandQuickTodos() {
    console.log(this.interdataList[0].quickTodosExpand);
    this.interdataList[0].quickTodosExpand =
      !this.interdataList[0].quickTodosExpand;
  }

  getStockdatas() {
    return this.interdataList;
  }
}
