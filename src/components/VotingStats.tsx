
import React from 'react';
import { Card } from '@/components/ui/card';
import { Users, Vote, CheckCheck } from 'lucide-react';

interface VotingStatsProps {
  totalVotes: number;
  totalVoters: number;
  blocksGenerated: number;
}

const VotingStats = ({ totalVotes, totalVoters, blocksGenerated }: VotingStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="p-6 backdrop-blur-lg bg-white/10 border border-white/20 hover:bg-white/15 transition-all duration-300">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-blue-500/20 rounded-lg">
            <Vote className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <p className="text-gray-300 text-sm">Total Votes</p>
            <p className="text-2xl font-bold text-white">{totalVotes.toLocaleString()}</p>
          </div>
        </div>
      </Card>
      
      <Card className="p-6 backdrop-blur-lg bg-white/10 border border-white/20 hover:bg-white/15 transition-all duration-300">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-purple-500/20 rounded-lg">
            <Users className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <p className="text-gray-300 text-sm">Active Voters</p>
            <p className="text-2xl font-bold text-white">{totalVoters.toLocaleString()}</p>
          </div>
        </div>
      </Card>
      
      <Card className="p-6 backdrop-blur-lg bg-white/10 border border-white/20 hover:bg-white/15 transition-all duration-300">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-emerald-500/20 rounded-lg">
            <CheckCheck className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <p className="text-gray-300 text-sm">Blocks Mined</p>
            <p className="text-2xl font-bold text-white">{blocksGenerated}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default VotingStats;
