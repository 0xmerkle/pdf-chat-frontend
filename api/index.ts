import axios from 'axios';
import { getAuth } from 'firebase/auth';

export const uploadFile = async (file: File) => {
  const authToken = await getAuth().currentUser?.getIdToken();
  const instance = axios.create({
    headers: {
      authorization: `Bearer: ${authToken}`,
    },
  });
  const formData = new FormData();
  formData.append('upload', file);
  const r = await instance({
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL!}/loadPdf`,
    data: formData,
  });
  return r;
};

export const sendMessage = async (message: string) => {
  const authToken = await getAuth().currentUser?.getIdToken();
  const instance = axios.create({
    headers: {
      authorization: `Bearer: ${authToken}`,
    },
  });
  const r = await instance({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL!}/chat_with_agent`,
    data: { query: message },
  });
  return r;
};
