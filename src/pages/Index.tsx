
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import VotingCard from '@/components/VotingCard';
import BlockchainVisualization from '@/components/BlockchainVisualization';
import VotingStats from '@/components/VotingStats';
import { Vote, Shield, Users, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { toast } = useToast();
  const [hasVoted, setHasVoted] = useState(false);
  const [userVotedFor, setUserVotedFor] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [candidates, setCandidates] = useState([
    {
      id: '1',
      name: 'Sarah Johnson',
      party: 'Progressive Alliance',
      votes: 1247,
      image: 'photo-1494790108755-2616b332c1ca?w=150',
      description: 'Advocating for sustainable technology and digital rights with 15 years of public service experience.'
    },
    {
      id: '2', 
      name: 'Michael Chen',
      party: 'Innovation Party',
      votes: 986,
      image: 'photo-1507003211169-0a1dd7228f2d?w=150',
      description: 'Focused on blockchain governance and transparent decision-making processes for the digital age.'
    },
    {
      id: '3',
      name: 'Elena Rodriguez',
      party: 'Digital Democracy',
      votes: 1156,
      image: 'photo-1438761681033-6461ffad8d80?w=150',
      description: 'Champion of cybersecurity and privacy rights with extensive background in digital policy.'
    }
  ]);

  const totalVotes = candidates.reduce((sum, candidate) => sum + candidate.votes, 0);

  const handleWalletConnect = () => {
    setIsConnected(true);
    toast({
      title: "Wallet Connected",
      description: "Your blockchain wallet has been successfully connected.",
    });
  };

  const handleVote = (candidateId: string) => {
    if (hasVoted) return;
    
    setCandidates(prev => 
      prev.map(candidate => 
        candidate.id === candidateId 
          ? { ...candidate, votes: candidate.votes + 1 }
          : candidate
      )
    );
    
    setHasVoted(true);
    setUserVotedFor(candidateId);
    
    const candidate = candidates.find(c => c.id === candidateId);
    toast({
      title: "Vote Submitted Successfully!",
      description: `Your vote for ${candidate?.name} has been recorded on the blockchain.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="px-4 py-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                <Vote className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">VoteChain</h1>
                <p className="text-gray-300 text-sm">Blockchain Voting Platform</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {!isConnected ? (
                <Button 
                  onClick={handleWalletConnect}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-2 transition-all duration-300 hover:scale-105"
                >
                  Connect Wallet
                </Button>
              ) : (
                <Badge className="bg-emerald-600/20 text-emerald-300 border-emerald-400/30 px-4 py-2">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Wallet Connected
                </Badge>
              )}
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="px-4 py-12">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
              Secure Digital 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"> Voting</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Experience the future of democracy with blockchain-powered voting. Every vote is cryptographically secured, 
              transparent, and immutable on the distributed ledger.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <div className="flex items-center space-x-2 text-emerald-400">
                <Shield className="w-5 h-5" />
                <span>Cryptographically Secure</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-400">
                <CheckCircle className="w-5 h-5" />
                <span>Tamper-Proof</span>
              </div>
              <div className="flex items-center space-x-2 text-purple-400">
                <Users className="w-5 h-5" />
                <span>Transparent Results</span>
              </div>
            </div>
          </div>
        </section>

        {/* Voting Stats */}
        <section className="px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <VotingStats 
              totalVotes={totalVotes}
              totalVoters={2847}
              blocksGenerated={156}
            />
          </div>
        </section>

        {/* Main Voting Section */}
        {isConnected && (
          <section className="px-4 py-12">
            <div className="max-w-6xl mx-auto space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-4">Cast Your Vote</h2>
                <p className="text-gray-300">Select your candidate and submit your vote to the blockchain</p>
                {hasVoted && (
                  <Badge className="mt-4 bg-emerald-600/20 text-emerald-300 border-emerald-400/30 px-6 py-2">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Vote Successfully Recorded
                  </Badge>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {candidates.map((candidate) => (
                  <VotingCard
                    key={candidate.id}
                    {...candidate}
                    totalVotes={totalVotes}
                    hasVoted={hasVoted}
                    userVotedFor={userVotedFor}
                    onVote={handleVote}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Blockchain Visualization */}
        <section className="px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <BlockchainVisualization />
          </div>
        </section>

        {/* Security Features */}
        <section className="px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Security Features</h2>
              <p className="text-gray-300">Built with cutting-edge blockchain technology</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "End-to-End Encryption",
                  description: "All votes are encrypted using military-grade cryptography",
                  icon: Shield
                },
                {
                  title: "Immutable Records",
                  description: "Once recorded, votes cannot be altered or deleted",
                  icon: CheckCircle
                },
                {
                  title: "Decentralized Network",
                  description: "No single point of failure with distributed nodes",
                  icon: Users
                },
                {
                  title: "Real-time Verification",
                  description: "Instant vote verification through smart contracts",
                  icon: Vote
                }
              ].map((feature, index) => (
                <Card key={index} className="p-6 backdrop-blur-lg bg-white/10 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                  <div className="text-center space-y-4">
                    <div className="p-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg mx-auto w-fit">
                      <feature.icon className="w-8 h-8 text-blue-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-4 py-8 border-t border-white/10">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-gray-400">
              © 2024 VoteChain - Securing Democracy Through Blockchain Technology
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
