import { Salon } from '@/app/lib/types'
import Link from 'next/link'
import React from 'react'

function LatestSaloons({salons}: {salons: Salon[]}) {
  return (
    <div>
      
    <h2 className="text-2xl font-semibold mb-4">Latest Salons</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {salons.map((salon) => (
        <div key={salon.id} className="bg-white p-4 rounded-lg shadow">
         <Link href={`/salons/${salon.slug}`}>
            <h3 className="text-xl font-bold">{salon.name}</h3>
          </Link>
          <p className="text-gray-600">{salon.slug}</p>
        </div>
      ))} 
    </div>
    </div>
  )
}

export default LatestSaloons