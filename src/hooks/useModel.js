import { useState, useEffect } from 'react';
import ModelService from '../services/modelService';

export function useModel() {
  const [model, setModel] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadModel() {
      try {
        const modelService = await ModelService.getInstance();
        setModel(modelService);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    loadModel();
  }, []);

  return { model, error, isLoading };
}