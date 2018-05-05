const Zimp = require('./zimp')
const AdjacencyList = require('./schedule')

switch (process.argv[2]) {
	case 'gray':
		Zimp.greyscale('./Images/Building.jpg', './Images/Gray_Building.jpg')
    break
  case 'blur':
    Zimp.blur('./Images/Building.jpg', 4, './Images/Blurred_Building.jpg')
    break
  case 'sharpen':
    Zimp.sharpen('./Images/Building.jpg', 5, './Images/Sharp_Building.jpg')
    break
  case 'connect':
		Zimp.connect('./Images/Bacteria2.jpg', './Images/Connected.jpg')
		break
	case 'graph':
		const adj = AdjacencyList()

		adj.add('A', 'D')
		adj.add('A', 'B')
		adj.add('C', 'A')
		adj.add('C', 'D')
		adj.add('B', 'E')
		adj.add('D', 'E')
		adj.add('D', 'B')

		console.log(adj.order())

		const adj2 = AdjacencyList()

		adj2.add('A', 'B')
		adj2.add('C', 'B')
		adj2.add('C', 'G')
		adj2.add('B', 'D')
		adj2.add('D', 'G')
		adj2.add('I', 'H')
		adj2.add('H', 'F')
		adj2.add('G', 'I')
		adj2.add('E', 'D')
		adj2.add('E', 'F')
		adj2.add('E', 'I')

		console.log(adj2.order())
  default:
    break
}
