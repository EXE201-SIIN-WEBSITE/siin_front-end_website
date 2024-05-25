import React from 'react';
import '../components/animation/formOrder.css';

interface FormOrderProps {
  toggleFormOrder: () => void;
}

const FormOrder: React.FC<FormOrderProps> = ({ toggleFormOrder }) => {
  return (
    <div className="animate-slide-in bg-[#e4e4e4]">
      <form className="w-[500px] h-[560px] bg-[#e4e4e4]">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Họ và tên:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">
            Số điện thoại:
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="location" className="block text-gray-700 font-bold mb-2">
            Địa chỉ:
          </label>
          <select
            id="location"
            name="location"
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          >
            <option value="location1">Địa chỉ 1</option>
            <option value="location2">Địa chỉ 2</option>
            <option value="location3">Địa chỉ 3</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-black text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Xác nhận
        </button>
      </form>
    </div>
  );
};

export default FormOrder;
