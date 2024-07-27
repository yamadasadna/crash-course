import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { useEffect, useMemo, useState } from "react";
import { Select, SelectSection, SelectItem } from "@nextui-org/select";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";

export default function UseEffectExample() {
  const [touched, setTouched] = useState(false);
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: "Introduction to React",
      content: "This is an introductory post about React.",
    },
    {
      id: 2,
      title: "Getting Started with Hooks",
      content: "This post discusses how to use React Hooks.",
    },
    {
      id: 3,
      title: "Understanding useEffect",
      content: "A deep dive into the useEffect Hook.",
    },
  ]);
  const [dataSelect, SetDataSelect] = useState<any>([]);
  const [combinedData, setCombinedData] = useState<any>([]);
  // useEffect to fetch blog data (simulated with a timeout for demonstration)
  useEffect(() => {
    const fetchBlogs = async () => {
      // Simulate an API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const apiBlogs = [
        {
          id: 4,
          title: "Advanced React Patterns",
          content: "Learn about advanced patterns in React.",
        },
        {
          id: 5,
          title: "State Management with Redux",
          content: "An overview of state management using Redux.",
        },
      ];
      setCombinedData((prevBlogs: any) => [...blogs, ...apiBlogs]);
    };

    fetchBlogs();
  }, []); // Empty dependency array means this effect runs once on mount

  // useMemo to memoize the calculation of total blogs
  const totalBlogs = useMemo(() => {
    return combinedData.length;
  }, [combinedData]);

  const data = [
    { id: 11, title: "tambah 1", content: "Tambah 1" },
    { id: 12, title: "tambah 2", content: "Tambah 2" },
    { id: 13, title: "tambah 3", content: "Tambah 3" },
  ];

  useEffect(() => {
    setCombinedData((prevCombined: any) => [...prevCombined, ...dataSelect]);
  }, [dataSelect]);

  return (
    combinedData.length > 0 && (
      <DefaultLayout>
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
          <div className="inline-block max-w-lg text-center justify-center">
            <h1 className="text-2xl font-bold">UseEffect & UseMemo Example</h1>
            <div className="my-5">
            <Select
              label="Dummy Data"
              placeholder="Select Dummy Data"
              selectedKeys={dataSelect}
              onSelectionChange={(e) => {
                SetDataSelect([{ title: e.currentKey, content: e.currentKey }]);
              }}
              onClose={() => setTouched(true)}
              defaultSelectedKeys={["cat"]}
              className="max-w-[400px] mx-auto"
              fullWidth
            >
              {data.map((item) => (
                <SelectItem key={item.title}>{item.content}</SelectItem>
              ))}
            </Select>
            </div>
            <p>Total Data: {totalBlogs}</p>
          </div>
          {combinedData.length > 0 ? (
            combinedData.map((blog: any) => (
              <Card
                key={blog.id}
                className="max-w-[400px] mx-auto"
                fullWidth
                shadow="sm"
              >
                <CardHeader className="flex gap-3">
                  <h2 className="text-xl font-semibold">{blog.title}</h2>
                </CardHeader>
                <Divider />
                <CardBody>{blog.content}</CardBody>
              </Card>
            ))
          ) : (
            <>LOADING</>
          )}
        </section>
      </DefaultLayout>
    )
  );
}
