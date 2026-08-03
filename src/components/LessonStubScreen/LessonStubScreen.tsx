type LessonStubScreenProps = {
	title: string;
	description: string;
};

export function LessonStubScreen({ title, description }: LessonStubScreenProps) {
	return (
		<>
			<h2>{title}</h2>
			<p>{description}</p>
		</>
	);
}
