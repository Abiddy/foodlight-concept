import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";

export function MenuCard({ item, addToCart }) {

  return (
    <Card className="w-full max-w-[48rem] flex-row mb-4">
      <CardHeader shadow={false} floated={false} className="m-0 w-2/5 shrink-0 rounded-r-none">
        <img
          src={item.item_image_url || 'default-image-url'}
          alt="card-image"
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h2" className="mb-2">
          {item.item_name}
        </Typography>
        <Typography color="blue-gray" className="font-medium">
          ${item.item_price}
        </Typography>
        <Typography color="gray" className="mb-4 font-normal">   
              {item.item_description}
          </Typography>
        <a href="#" className="inline-block">
          <Button
            onClick={() => addToCart(item)}
            variant="text"
            className="flex items-center gap-2"
          >
            Add
          </Button>
        </a>
      </CardBody>
    </Card>
  );
}
