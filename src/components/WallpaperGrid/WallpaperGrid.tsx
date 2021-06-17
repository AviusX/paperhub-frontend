const WallpaperGrid: React.FC = props => (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 grid-flow-row-dense items-center 
            justify-items-center px-4">
        {props.children}
    </div>
);

export default WallpaperGrid;