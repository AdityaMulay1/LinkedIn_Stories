import React, { useState, useEffect } from 'react';
import { Plus, X, ChevronLeft, ChevronRight, Play, Pause, Heart, MessageCircle, Send, MoreHorizontal, Camera, Type, Briefcase, TrendingUp, Users, Award } from 'lucide-react';

const LinkedInStories = () => {
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Sample stories data with Indian names and default avatars
  const stories = [
    {
      id: 1,
      user: {
        name: "Your Story",
        avatar: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Ccircle cx='30' cy='30' r='30' fill='%230a66c2'/%3E%3Ctext x='30' y='38' text-anchor='middle' fill='white' font-family='Arial' font-size='24' font-weight='bold'%3EA%3C/text%3E%3C/svg%3E",
        isYou: true
      },
      slides: []
    },
    {
      id: 2,
      user: {
        name: "Aditya Sharma",
        title: "Product Manager at TechCorp",
        avatar: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Ccircle cx='30' cy='30' r='30' fill='%23e74c3c'/%3E%3Ctext x='30' y='38' text-anchor='middle' fill='white' font-family='Arial' font-size='22' font-weight='bold'%3EAD%3C/text%3E%3C/svg%3E",
        isYou: false,
        isHighlighted: true
      },
      slides: [
        {
          type: "text",
          content: "Just launched our new product! 🚀 Grateful for the amazing team that made this possible.",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          timestamp: "2h"
        },
        {
          type: "image",
          content: "Team celebration after the successful launch",
          image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='600' viewBox='0 0 400 600'%3E%3Crect width='400' height='600' fill='%23f8f9fa'/%3E%3Ccircle cx='200' cy='200' r='60' fill='%23e9ecef'/%3E%3Crect x='50' y='300' width='300' height='40' rx='20' fill='%23dee2e6'/%3E%3Crect x='50' y='360' width='250' height='40' rx='20' fill='%23dee2e6'/%3E%3Crect x='50' y='420' width='200' height='40' rx='20' fill='%23dee2e6'/%3E%3Ctext x='200' y='520' text-anchor='middle' fill='%236c757d' font-family='Arial' font-size='18'%3ETeam Photo%3C/text%3E%3C/svg%3E",
          timestamp: "2h"
        }
      ]
    },
    {
      id: 3,
      user: {
        name: "Rahul Verma",
        title: "Senior Developer at StartupXYZ",
        avatar: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Ccircle cx='30' cy='30' r='30' fill='%2327ae60'/%3E%3Ctext x='30' y='38' text-anchor='middle' fill='white' font-family='Arial' font-size='22' font-weight='bold'%3ERV%3C/text%3E%3C/svg%3E",
        isYou: false
      },
      slides: [
        {
          type: "text",
          content: "Coding through the weekend for our hackathon project. The grind never stops! 💻",
          background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
          timestamp: "4h"
        }
      ]
    },
    {
      id: 4,
      user: {
        name: "Saniya Khan",
        title: "Marketing Director at InnovateInc",
        avatar: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Ccircle cx='30' cy='30' r='30' fill='%239b59b6'/%3E%3Ctext x='30' y='38' text-anchor='middle' fill='white' font-family='Arial' font-size='22' font-weight='bold'%3ESK%3C/text%3E%3C/svg%3E",
        isYou: false
      },
      slides: [
        {
          type: "text",
          content: "Networking event was incredible! Made some great connections for future collaborations.",
          background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
          timestamp: "6h"
        },
        {
          type: "image",
          content: "Great turnout at today's industry conference",
          image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='600' viewBox='0 0 400 600'%3E%3Crect width='400' height='600' fill='%23f8f9fa'/%3E%3Ccircle cx='120' cy='150' r='25' fill='%23e9ecef'/%3E%3Ccircle cx='200' cy='150' r='25' fill='%23e9ecef'/%3E%3Ccircle cx='280' cy='150' r='25' fill='%23e9ecef'/%3E%3Crect x='50' y='250' width='300' height='150' rx='10' fill='%23dee2e6'/%3E%3Ctext x='200' y='480' text-anchor='middle' fill='%236c757d' font-family='Arial' font-size='16'%3EConference Hall%3C/text%3E%3C/svg%3E",
          timestamp: "6h"
        }
      ]
    },
    {
      id: 5,
      user: {
        name: "Priya Patel",
        title: "UX Designer at DesignStudio",
        avatar: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Ccircle cx='30' cy='30' r='30' fill='%23f39c12'/%3E%3Ctext x='30' y='38' text-anchor='middle' fill='white' font-family='Arial' font-size='22' font-weight='bold'%3EPP%3C/text%3E%3C/svg%3E",
        isYou: false
      },
      slides: [
        {
          type: "text",
          content: "Just finished a user research session. The insights are mind-blowing! 🎨✨",
          background: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
          timestamp: "1h"
        }
      ]
    }
  ];

  const storyTemplates = [
    { icon: Briefcase, label: "Work Update", bg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
    { icon: TrendingUp, label: "Achievement", bg: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" },
    { icon: Users, label: "Team Moment", bg: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" },
    { icon: Award, label: "Milestone", bg: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)" }
  ];

  // Auto-progress story slides
  useEffect(() => {
    if (selectedStoryIndex !== null && isPlaying) {
      const timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            handleNextSlide();
            return 0;
          }
          return prev + 2;
        });
      }, 100);

      return () => clearInterval(timer);
    }
  }, [selectedStoryIndex, currentSlideIndex, isPlaying]);

  const handleStoryClick = (index) => {
    if (stories[index].user.isYou && stories[index].slides.length === 0) {
      setShowCreateModal(true);
    } else {
      setSelectedStoryIndex(index);
      setCurrentSlideIndex(0);
      setProgress(0);
      setIsPlaying(true);
    }
  };

  const handleNextSlide = () => {
    const currentStory = stories[selectedStoryIndex];
    if (currentSlideIndex < currentStory.slides.length - 1) {
      setCurrentSlideIndex(prev => prev + 1);
      setProgress(0);
    } else {
      // Move to next story
      if (selectedStoryIndex < stories.length - 1) {
        setSelectedStoryIndex(prev => prev + 1);
        setCurrentSlideIndex(0);
        setProgress(0);
      } else {
        closeStoryViewer();
      }
    }
  };

  const handlePrevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(prev => prev - 1);
      setProgress(0);
    } else if (selectedStoryIndex > 0) {
      setSelectedStoryIndex(prev => prev - 1);
      const prevStory = stories[selectedStoryIndex - 1];
      setCurrentSlideIndex(prevStory.slides.length - 1);
      setProgress(0);
    }
  };

  const closeStoryViewer = () => {
    setSelectedStoryIndex(null);
    setCurrentSlideIndex(0);
    setProgress(0);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const renderStoryViewer = () => {
    if (selectedStoryIndex === null) return null;

    const currentStory = stories[selectedStoryIndex];
    const currentSlide = currentStory.slides[currentSlideIndex];

    return (
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
        {/* Progress bars */}
        <div className="absolute top-4 left-4 right-4 flex gap-1 z-10">
          {currentStory.slides.map((_, index) => (
            <div key={index} className="flex-1 h-1 bg-white/30 rounded-full">
              <div 
                className="h-full bg-white rounded-full transition-all duration-100"
                style={{ 
                  width: index < currentSlideIndex ? '100%' : 
                         index === currentSlideIndex ? `${progress}%` : '0%' 
                }}
              />
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="absolute top-8 left-4 right-4 flex items-center justify-between z-10 mt-6">
          <div className="flex items-center gap-3">
            <img 
              src={currentStory.user.avatar} 
              alt={currentStory.user.name}
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <div>
              <div className="text-white font-semibold text-sm">{currentStory.user.name}</div>
              {currentStory.user.title && (
                <div className="text-white/80 text-xs">{currentStory.user.title}</div>
              )}
            </div>
            <div className="text-white/60 text-xs">{currentSlide.timestamp}</div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={togglePlayPause} className="text-white hover:text-white/80">
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button className="text-white hover:text-white/80">
              <MoreHorizontal size={20} />
            </button>
            <button onClick={closeStoryViewer} className="text-white hover:text-white/80">
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Story content */}
        <div className="w-full max-w-md h-full relative">
          {currentSlide.type === 'text' ? (
            <div 
              className="w-full h-full flex items-center justify-center p-8"
              style={{ background: currentSlide.background }}
            >
              <p className="text-white text-xl font-medium text-center leading-relaxed">
                {currentSlide.content}
              </p>
            </div>
          ) : (
            <div className="w-full h-full relative">
              <img 
                src={currentSlide.image} 
                alt={currentSlide.content}
                className="w-full h-full object-cover"
              />
              {currentSlide.content && (
                <div className="absolute bottom-20 left-4 right-4 bg-black/50 p-4 rounded-lg">
                  <p className="text-white text-sm">{currentSlide.content}</p>
                </div>
              )}
            </div>
          )}

          {/* Navigation areas */}
          <button 
            onClick={handlePrevSlide}
            className="absolute left-0 top-0 w-1/3 h-full z-10"
          />
          <button 
            onClick={handleNextSlide}
            className="absolute right-0 top-0 w-1/3 h-full z-10"
          />
        </div>

        {/* Story actions */}
        <div className="absolute bottom-8 left-4 right-4 flex items-center justify-center gap-6 z-10">
          <button className="flex flex-col items-center gap-1 text-white hover:text-white/80">
            <Heart size={24} />
            <span className="text-xs">Like</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-white hover:text-white/80">
            <MessageCircle size={24} />
            <span className="text-xs">Comment</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-white hover:text-white/80">
            <Send size={24} />
            <span className="text-xs">Share</span>
          </button>
        </div>
      </div>
    );
  };

  const renderCreateModal = () => {
    if (!showCreateModal) return null;

    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg w-full max-w-md">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-semibold">Create Your Story</h3>
            <button 
              onClick={() => setShowCreateModal(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button className="flex flex-col items-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50">
                <Camera size={32} className="text-gray-400" />
                <span className="text-sm font-medium">Photo</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50">
                <Type size={32} className="text-gray-400" />
                <span className="text-sm font-medium">Text</span>
              </button>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Quick Templates</h4>
              {storyTemplates.map((template, index) => (
                <button
                  key={index}
                  className="w-full flex items-center gap-3 p-3 rounded-lg border hover:bg-gray-50"
                >
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: template.bg }}
                  >
                    <template.icon size={20} className="text-white" />
                  </div>
                  <span className="font-medium">{template.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white">
      {/* LinkedIn Header */}
      <div className="bg-white border-b px-4 py-3 flex items-center gap-3">
        <div className="flex items-center gap-2">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="6" fill="#0A66C2"/>
            <path d="M8.5 12.5H11.5V23.5H8.5V12.5Z" fill="white"/>
            <path d="M10 8.5C10.8284 8.5 11.5 9.17157 11.5 10C11.5 10.8284 10.8284 11.5 10 11.5C9.17157 11.5 8.5 10.8284 8.5 10C8.5 9.17157 9.17157 8.5 10 8.5Z" fill="white"/>
            <path d="M13.5 12.5H16.5V14.1H16.53C16.93 13.39 17.86 12.64 19.3 12.64C22.24 12.64 23.5 14.43 23.5 17.07V23.5H20.5V17.67C20.5 16.43 20.27 15.43 19.13 15.43C17.65 15.43 16.5 16.43 16.5 17.67V23.5H13.5V12.5Z" fill="white"/>
          </svg>
          <span className="text-xl font-bold text-gray-900">LinkedIn</span>
        </div>
      </div>

      {/* Stories section */}
      <div className="border-b bg-white p-4">
        <div className="flex items-center gap-4 overflow-x-auto pb-2">
          {stories.map((story, index) => (
            <button
              key={story.id}
              onClick={() => handleStoryClick(index)}
              className="flex-shrink-0 flex flex-col items-center gap-2 group"
            >
              <div className="relative">
                {/* Story Ring */}
                <div className={`absolute inset-0 rounded-full ${
                  story.user.isHighlighted 
                    ? 'bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 p-1'
                    : story.user.isYou && story.slides.length === 0
                    ? 'border-2 border-dashed border-gray-300 p-1'
                    : story.slides.length > 0
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 p-1'
                    : 'border-2 border-gray-300 p-1'
                } group-hover:scale-105 transition-transform`}>
                  <div className="w-16 h-16 bg-white rounded-full"></div>
                </div>
                
                {/* Avatar */}
                <div className="relative z-10 p-1">
                  <img 
                    src={story.user.avatar} 
                    alt={story.user.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                </div>
                
                {story.user.isYou && story.slides.length === 0 && (
                  <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1 z-20">
                    <Plus size={16} className="text-white" />
                  </div>
                )}
              </div>
              <span className="text-xs font-medium text-gray-700 max-w-20 truncate">
                {story.user.isYou ? "Your Story" : story.user.name.split(' ')[0]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main feed content */}
      <div className="p-6 text-center text-gray-500">
        <p>Your LinkedIn feed content would appear here...</p>
      </div>

      {renderStoryViewer()}
      {renderCreateModal()}
    </div>
  );
};

export default LinkedInStories;
