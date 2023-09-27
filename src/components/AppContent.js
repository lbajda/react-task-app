import React from 'react'

export default function AppContent() {
    return (
        <div className='flex flex-col'>
            <div>
                <h2 className='text-2xl font-bold'>All Tasks</h2>

                <div className='flex flex-col space-y-4 mt-4'>
                    {/* <div className='flex justify-between'> */}
                    <div className='flex flex-col space-y-2'>
                        <h3 className='text-lg font-semibold'>Task 1</h3>
                        <p className='text-sm text-gray-500'>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Voluptatibus, quidem.
                        </p>
                    </div>
                    <div className='flex flex-col space-y-2'>
                        <h3 className='text-lg font-semibold'>Task 2</h3>
                        <p className='text-sm text-gray-500'>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Voluptatibus, quidem.
                        </p>
                    </div>
                    <div className='flex flex-col space-y-2'>
                        <h3 className='text-lg font-semibold'>Task 3</h3>
                        <p className='text-sm text-gray-500'>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Voluptatibus, quidem.
                        </p>
                    </div>
                </div>
                {/* </div> */}
            </div>
        </div>
    )
}
