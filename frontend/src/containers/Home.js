import React, { createRef, useEffect } from 'react'
import {Engine, Render, Runner, World, Bodies} from 'matter-js'
import Button from 'components/Button'
import Input from 'components/Input'

const pixels = [
  {
    col: 10,
    row: 1,
    fill: '#456'
  },
  {
    col: 11,
    row: 1,
    fill: '#684'
  },
  {
    col: 12,
    row: 1,
    fill: '#684'
  },
  {
    col: 13,
    row: 1,
    fill: '#684'
  },
  {
    col: 9,
    row: 2,
    fill: '#847'
  },
  {
    col: 10,
    row: 2,
    fill: '#847'
  },
  {
    col: 12,
    row: 2,
    fill: '#847'
  },
  {
    col: 9,
    row: 3,
    fill: '#847'
  },
  {
    col: 11,
    row: 3,
    fill: '#847'
  },
  {
    col: 12,
    row: 3,
    fill: '#847'
  },
]

const Home = () => {
  const containerRef = createRef(null)
  const gridRef = createRef(null)
  const canvasRef = createRef(null)

  const pixelSize = 30
  const colCount = 24
  const rowCount = 24
  const containerWidth = pixelSize * colCount
  const containerHeight = pixelSize * rowCount

  const engine = Engine.create()
  const { world } = engine
  const runner = Runner.create()
  const wall = [
    Bodies.rectangle(
      containerWidth / 2, -2,
      containerWidth, 4,
      { isStatic: true }),
    Bodies.rectangle(
      containerWidth + 2, containerHeight / 2,
      4, containerHeight,
      { isStatic: true }
    ),
    Bodies.rectangle(
      -2, containerHeight / 2,
      4, containerHeight,
      { isStatic: true }),
    Bodies.rectangle(
      containerWidth / 2, containerHeight + 2,
      containerWidth, 4,
      { isStatic: true }
    ),
  ];

  const drawGrid = (w, h, s, canvas) => {
    const ctx = canvas.getContext('2d')
    ctx.canvas.width = w
    ctx.canvas.height = h
  
    for (let x = 0; x <= w; x += s) {
      for (let y = 0; y <= h; y += s) {
        ctx.moveTo(x, 0)
        ctx.lineTo(x, h)
        ctx.stroke()
        ctx.moveTo(0, y)
        ctx.lineTo(w, y)
        ctx.stroke()
      }
    }
  }
  
  const getRectangles = (data) => {
    return data.map((el) => {
      const x = el.col * pixelSize - pixelSize / 2
      const y = el.row * pixelSize - pixelSize / 2
  
      const body = Bodies.rectangle(
        x, y, pixelSize, pixelSize, 
        // { render: { fillStyle: el.fill } }
      )
      body.restitution = Math.random() * 0.1

      return body
    })
  }
  
  useEffect(() => {
    drawGrid(containerWidth, containerHeight, pixelSize, gridRef.current)

    const render = Render.create({
      element: containerRef.current,
      engine,
      canvas: canvasRef.current,
      options: {
        width: containerWidth,
        height: containerHeight,
        background: 'rgba(255, 0, 0, 0.3)',
        wireframes: false,
        // showAngleIndicator: true,
        // showBroadphase: true
      },
    })

    Render.run(render)
    
    Render.lookAt(render, {
      min: { x: 0, y: 0 },
      max: { x: containerWidth, y: containerHeight }
    })
    
    init()
    
    return {
      engine,
      runner,
      render,
      canvas: render.canvas,
      stop: () => {
        Render.stop(render)
        Runner.stop(runner)
      }
    }
  }, [])
  
  const init = () => {
    World.add(world, wall)
    World.add(world, getRectangles(pixels))

    // World.add(world, Composites.stack(150, 20, 6, 10, 0, 0, (x, y) => {
    //   return Bodies.rectangle(x, y, 30, 30)
    // }))
  }
  
  const handleFall = () => {
    Runner.run(runner, engine)
  }

  const handleReset = () => {
    Runner.stop(runner, engine)
    World.clear(world)

    init()
  }

  const handleDownload = () => {
    const url = canvasRef.current.toDataURL("image/png")
    const link = document.createElement('a')
    link.download = 'pixels.png'
    link.href = url
    link.click()
  }

  return (
    <div className="mx-auto py-5">
      <div className="flex justify-center">
        <div
          className="relative"
          ref={containerRef}
          style={{
            width: containerWidth,
            height: containerHeight,
          }}
        >
          <canvas ref={canvasRef} />
          <canvas className="absolute opacity-10" ref={gridRef} />
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center">
          <Input className="mr-2" placeholder="Enter ID" />
          <Button color="gray" onClick={() => false}>LOAD</Button>
        </div>
        <div className="flex">
          <Button className="mr-2" onClick={() => handleFall()}>FALL</Button>
          <Button color="gray" className="mr-2" onClick={() => handleReset()}>RESET</Button>
          <Button color="gray" onClick={() => handleDownload()}>DOWNLOAD</Button>
        </div>
      </div>
    </div>
  )
}

export default Home