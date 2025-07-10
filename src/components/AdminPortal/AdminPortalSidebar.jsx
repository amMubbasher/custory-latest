import React, { useState } from 'react';
import { FaChevronRight, FaChevronUp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const MenuItem = ({ title, onClick, open, child, icon }) => {
  const router = useNavigate();
  return (
    <>
      <div onClick={onClick} className='flex cursor-pointer justify-between max-2xl:px-2 items-center'>
        <div className='flex p-2 items-center space-x-4 lg:px-3'>
          <div className='text-lg max-2xl:text-base'>{title}</div>
        </div>
        <div>
          {open ? <FaChevronUp className='text-gray-500' size={18} /> : icon}
        </div>
      </div>
      <div>
        {open && (
          <div className='pl-10 mt-[-15px]'>
            {child.map((child, index) => {
              return (
                <React.Fragment key={index}>
                  <MenuItem onClick={() => router(`${child.path}`)} title={child.subTitle} />
                </React.Fragment>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

const AdminPortalSidebar = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const sideNav = [
    {
      title: 'Order Management',
      child: [
        {
          subTitle: 'My Orders',
          path: '/adminPortal/myorders',
        },
      ],
    },
    {
      title: 'Product Management',
      child: [
        {
          subTitle: 'My Products',
          path: '/adminPortal/myproducts',
        },
        {
          subTitle: 'Add Product',
          path: '/adminPortal/addproducts',
        },
        {
          subTitle: 'Inventory',
          path: '/adminPortal/inventory',
        },
      ],
    },
    {
      title: 'Customer Management',
      child: [
        {
          subTitle: 'Chat Management',
          path: '/adminPortal/chat',
        },
        {
          subTitle: 'Broadcast',
          path: '/adminPortal/broadcast',
        },
      ],
    },
    {
      title: 'Payment Management',
      child: [
        {
          subTitle: 'Wallet',
          path: '/adminPortal/payments/wallet',
        },
        {
          subTitle: 'Retrieve Wallet',
          path: '/adminPortal/payments/retreve',
        },
      ],
    },
    {
      title: 'Reporting and Analytics',
      child: [
        {
          subTitle: 'Settings',
          path: '/adminPortal/settings',
        },
      ],
    },
    {
      title: 'Quotation',
      child: [
        {
          subTitle: 'All Quotations',
          path: '/adminPortal/quotation',
        },
      ],
    }
  ];

  const handleClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className='bg-white rounded-md w-full'>
      <div className='mt-2 p-3 lg:p-2 bg-white space-y-4'>
        {sideNav.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <MenuItem
                onClick={() => handleClick(index)}
                title={item.title}
                child={item.child}
                open={openIndex === index}
                icon={<FaChevronRight className='text-gray-500' size={18} />}
              />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default AdminPortalSidebar;
