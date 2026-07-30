'use client'
import React, { useEffect, useState } from 'react';
import { supabase } from '@/app/lib/supabaseClient';
import { Star, Calendar, MessageCircle } from 'lucide-react';

interface ReviewType {
  id: number;
  rating: number;
  comment: string;
  user_id: number;
  created_at: string;
}

interface UserType {
  id: number;
  name?: string;
  email?: string;
  avatar_url?: string;
}

interface ReviewsProps {
  serviceReviews: ReviewType[];
  salonId:number;

}

export default function Reviews({ serviceReviews,salonId }: ReviewsProps) {
  const [users, setUsers] = useState<{ [key: number]: UserType }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!serviceReviews || serviceReviews.length === 0) {
        setLoading(false);
        return;
      }

      try {
        const userIds = [...new Set(serviceReviews.map(review => review.user_id))];

        // ✅ Try different column names
        const { data: usersData, error } = await supabase
          .from('users')
          .select('id, first_name, last_name,  email, avatar_url')
          .in('id', userIds);

        if (error) {
          console.error('Error fetching users:', error.message);
          
          // ✅ Try with profiles table
          const { data: profilesData, error: profilesError } = await supabase
            .from('users')
            .select('id, first_name, last_name,  email, avatar_url')
            .in('id', userIds);

          if (!profilesError && profilesData) {
            const usersMap: { [key: number]: UserType } = {};
            profilesData.forEach((user: any) => {
              usersMap[user.id] = {
                id: user.id,
                name: user.first_name || user.last_name || user.name || `User ${user.id}`,
                email: user.email,
                avatar_url: user.avatar_url
              };
            });
            setUsers(usersMap);
           // setReviews(serviceReviews);
            setLoading(false);
            return;
          }

          // ✅ Fallback: Default users
          const defaultUsers: { [key: number]: UserType } = {};
          userIds.forEach(id => {
            defaultUsers[id] = { id, name: `User ${id}` };
          });
          setUsers(defaultUsers);
         // setReviews(serviceReviews);
          setLoading(false);
          return;
        }

        // ✅ Create users map
        const usersMap: { [key: number]: UserType } = {};
        usersData?.forEach((user: any) => {
          usersMap[user.id] = {
            id: user.id,
            name: user.first_name || user.last_name || user.name || `User ${user.id}`,
            email: user.email,
            avatar_url: user.avatar_url
          };
        });

        // ✅ Default for missing users
        userIds.forEach(id => {
          if (!usersMap[id]) {
            usersMap[id] = { id, name: `User ${id}` };
          }
        });

        setUsers(usersMap);
       // setReviews(serviceReviews);
      } catch (error) {
        console.error('Error:', error);
        // ✅ Fallback
        const defaultUsers: { [key: number]: UserType } = {};
        const userIds = [...new Set(serviceReviews.map(review => review.user_id))];
        userIds.forEach(id => {
          defaultUsers[id] = { id, name: `User ${id}` };
        });
        setUsers(defaultUsers);
      //  setReviews(serviceReviews);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [serviceReviews]);

  // Helper functions
  const getlast_name = (userId: number): string => {
    return users[userId]?.name || `User ${userId}`;
  };

  const getUserInitial = (userId: number): string => {
    const name = getlast_name(userId);
    return name.charAt(0).toUpperCase();
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={14}
            className={star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
          />
        ))}
      </div>
    );
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary"></div>
      </div>
    );
  }

  // No reviews
  if (!serviceReviews || serviceReviews.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-8 text-center">
        <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-gray-700">No Reviews Yet</h3>
        <p className="text-sm text-gray-500 mt-1">Be the first to review this service!</p>
      </div>
    );
  }

  // Render reviews
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-6">
        Customer Reviews
        <span className="ml-2 text-sm font-normal text-gray-500">
          ({serviceReviews.length} {serviceReviews.length === 1 ? 'review' : 'reviews'})
        </span>
      </h2>

      <div className="space-y-6">
        {serviceReviews.map((review) => (
          <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
            <div className="flex items-start gap-3">
              {/* Avatar */}
              <div className="h-9 w-9 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-semibold text-secondary">
                  {getUserInitial(review.user_id)}
                </span>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {getlast_name(review.user_id)}
                  </p>
                  <span className="text-xs text-gray-400 flex items-center gap-1 flex-shrink-0">
                    <Calendar size={12} />
                    {formatDate(review.created_at)}
                  </span>
                </div>
                
                {/* Stars */}
                {renderStars(review.rating)}
                
                {/* Comment */}
                <p className="text-sm text-gray-700 mt-2">{review.comment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}