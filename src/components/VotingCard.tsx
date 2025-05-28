
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Vote, CheckCircle } from 'lucide-react';

interface VotingCardProps {
  id: string;
  name: string;
  party: string;
  votes: number;
  totalVotes: number;
  image: string;
  description: string;
  hasVoted: boolean;
  userVotedFor: string | null;
  onVote: (candidateId: string) => void;
}

const VotingCard = ({ 
  id, 
  name, 
  party, 
  votes, 
  totalVotes, 
  image, 
  description, 
  hasVoted, 
  userVotedFor, 
  onVote 
}: VotingCardProps) => {
  const percentage = totalVotes > 0 ? (votes / totalVotes) * 100 : 0;
  const isSelected = userVotedFor === id;

  return (
    <Card className={`p-6 backdrop-blur-lg bg-white/10 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 ${isSelected ? 'ring-2 ring-emerald-400 bg-emerald-500/20' : ''}`}>
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <img 
            src={`https://images.unsplash.com/${image}`} 
            alt={name}
            className="w-24 h-24 rounded-full object-cover border-4 border-white/30"
          />
          {isSelected && (
            <CheckCircle className="absolute -top-2 -right-2 w-8 h-8 text-emerald-400 bg-gray-900 rounded-full" />
          )}
        </div>
        
        <div className="text-center">
          <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
          <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-400/30">
            {party}
          </Badge>
        </div>
        
        <p className="text-gray-300 text-sm text-center leading-relaxed">
          {description}
        </p>
        
        <div className="w-full space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-300">Votes</span>
            <span className="text-white font-semibold">{votes.toLocaleString()}</span>
          </div>
          
          <div className="w-full bg-gray-700/50 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
          
          <div className="text-center text-lg font-bold text-white">
            {percentage.toFixed(1)}%
          </div>
        </div>
        
        <Button 
          onClick={() => onVote(id)}
          disabled={hasVoted}
          className={`w-full ${isSelected 
            ? 'bg-emerald-600 hover:bg-emerald-700' 
            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
          } text-white font-semibold py-3 transition-all duration-300 ${hasVoted ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
        >
          <Vote className="w-4 h-4 mr-2" />
          {hasVoted ? (isSelected ? 'Your Vote' : 'Voted') : 'Vote Now'}
        </Button>
      </div>
    </Card>
  );
};

export default VotingCard;
