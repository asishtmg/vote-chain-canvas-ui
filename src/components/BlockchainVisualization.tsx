
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';

const BlockchainVisualization = () => {
  const [blocks, setBlocks] = useState([
    { id: 1, hash: '0x1a2b3c...', votes: 23, timestamp: new Date().toISOString() },
    { id: 2, hash: '0x4d5e6f...', votes: 31, timestamp: new Date().toISOString() },
    { id: 3, hash: '0x7g8h9i...', votes: 18, timestamp: new Date().toISOString() },
  ]);

  const [newBlock, setNewBlock] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setNewBlock(true);
      setTimeout(() => {
        setBlocks(prev => [
          ...prev,
          {
            id: prev.length + 1,
            hash: `0x${Math.random().toString(16).substr(2, 6)}...`,
            votes: Math.floor(Math.random() * 50) + 1,
            timestamp: new Date().toISOString()
          }
        ]);
        setNewBlock(false);
      }, 1000);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-2">Blockchain Network</h3>
        <p className="text-gray-300">Real-time vote verification on the blockchain</p>
      </div>
      
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {blocks.slice(-4).map((block, index) => (
          <Card 
            key={block.id}
            className={`min-w-[200px] p-4 backdrop-blur-lg bg-white/10 border border-white/20 transition-all duration-500 ${
              newBlock && index === blocks.slice(-4).length - 1 ? 'animate-pulse scale-105' : ''
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Block #{block.id}</span>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              
              <div className="space-y-1">
                <p className="text-xs text-gray-300">Hash:</p>
                <p className="text-sm font-mono text-blue-300">{block.hash}</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-xs text-gray-300">Votes:</p>
                <p className="text-lg font-bold text-white">{block.votes}</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-xs text-gray-300">Time:</p>
                <p className="text-xs text-gray-400">
                  {new Date(block.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          </Card>
        ))}
        
        {newBlock && (
          <Card className="min-w-[200px] p-4 backdrop-blur-lg bg-emerald-500/20 border border-emerald-400/50 animate-pulse">
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                <p className="text-emerald-300 text-sm">Mining Block...</p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default BlockchainVisualization;
